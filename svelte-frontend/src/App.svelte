<script>
    import { onMount, onDestroy } from 'svelte';
    import { Send, Clipboard, Paperclip, Download, Copy } from 'lucide-svelte';
    
    let items = [];
    let text = '';
    let days = 1;
    let interval;

    async function uploadFile(event) {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('days', days);
            const response = await fetch('https://fastapi.ridhachowdhury.com/upload-file/', {
                method: 'POST',
                body: formData
            });
            const result = await response.json();
            fetchItems(); // Refresh the list after uploading
            alert(`File uploaded. Expires on: ${result.expiry_time}`);
        }
    }

    async function uploadText() {
        const formData = new FormData();
        formData.append('text', text);
        formData.append('days', days);
        const response = await fetch('https://fastapi.ridhachowdhury.com/upload-text/', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();
        fetchItems(); // Refresh the list after uploading
        alert(`Text uploaded. Expires on: ${result.expiry_time}`);
    }

    async function fetchItems() {
        const response = await fetch('https://fastapi.ridhachowdhury.com/items/');
        const data = await response.json();

        // Convert expiry_time to "Expires in X hrs" format
        items = data.map(item => {
            const expiryDate = new Date(item.expiry_time);
            const currentTime = new Date();
            const diffHours = Math.ceil((expiryDate - currentTime) / 3600000);
            item.expiry_text = `Expires in ${diffHours} hrs`;
            return item;
        });
    }

    function pasteFromClipboard() {
        navigator.clipboard.readText().then(clipboardText => {
            text = clipboardText;
        }).catch(err => {
            console.error('Failed to read clipboard contents: ', err);
        });
    }

    async function copyToClipboard(uuid) {
        const response = await fetch(`https://fastapi.ridhachowdhury.com/fetch_text/${uuid}`);
        const data = await response.json();
        navigator.clipboard.writeText(data.content).then(() => {
            alert("Text copied to clipboard");
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    }

    async function downloadFile(uuid) {
        const response = await fetch(`https://fastapi.ridhachowdhury.com/fetch_file/${uuid}`);
        const data = await response.json();

        const fileResponse = await fetch(data.file_url);
        const blob = await fileResponse.blob();
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = data.original_name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Clean up
    }

    function adjustTextareaHeight(event) {
        const textarea = event.target;
        textarea.style.height = '48px'; // Set to initial height
        textarea.style.height = textarea.scrollHeight + 'px'; // Adjust height based on content
    }

    onMount(() => {
        fetchItems(); // Fetch items once when the component mounts

        // Set up a periodic refresh every 3 seconds
        interval = setInterval(fetchItems, 3000);
    });

    onDestroy(() => {
        clearInterval(interval); // Clear the interval when the component is destroyed
    });
</script>

<style>
    body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: #f4f4f9;
        color: #333;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        box-sizing: border-box;
    }

    #app {
        width: 100%;
        padding: 30px;
        background: #ffffff;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        box-sizing: border-box;
    }

    .upload-container {
        display: flex;
        align-items: start;
        gap: 10px;
        margin-bottom: 20px;
        width: 100%;
    }

    .upload-container input[type="file"] {
        display: none;
    }

    .upload-container button {
        width: 48px;
        height: 48px;
        border-radius: 8px;
        border: 1px solid #ddd;
        background-color: #007bff;
        color: white;
        cursor: pointer;
        transition: background-color 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        box-sizing: border-box;
        padding: 0;
    }

    .upload-container textarea {
        flex-grow: 1;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 8px;
        font-size: 16px;
        resize: none;
        overflow: hidden;
        box-sizing: border-box;
        height: 48px; /* Same height as the buttons */
        min-height: 48px; /* Ensure it doesn't get smaller than this */
    }

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    ul li {
        background-color: #f9f9f9;
        margin-bottom: 10px;
        padding: 15px;
        border-radius: 4px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid #ddd;
        box-sizing: border-box;
    }

    .file-info {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .file-info span {
        font-size: 14px;
        color: #666;
        text-align: center;
    }

    .file-actions {
        display: flex;
        gap: 10px;
    }

    ul li.active {
        border-left: 5px solid #28a745;
    }

    ul li.expired {
        border-left: 5px solid #dc3545;
    }
</style>

<div id="app">
	<h2>Send Stuff</h2>
    <div class="upload-container"> 
        <input id="file-upload" type="file" on:change={uploadFile}>
        <button type="button" on:click={() => document.getElementById('file-upload').click()}><Paperclip/></button>
        
        <button type="button" on:click={pasteFromClipboard}><Clipboard/></button>
        
        <textarea bind:value={text} placeholder="Enter your text here" required on:input={adjustTextareaHeight}></textarea>
        
        <button type="button" on:click={uploadText}><Send/></button>
    </div>

    <ul>
        {#each items as item}
            <li class={item.is_expired ? 'expired' : 'active'}>
                <div class="file-info">
                    <div>{item.original_name}</div>
                    <span>{item.expiry_text}</span>
                </div>
                <div class="file-actions">
                    {#if item.file_type === 'text'}
                        <button type="button" on:click={() => copyToClipboard(item.uuid)}><Copy/></button>
                    {:else}
                        <button type="button" on:click={() => downloadFile(item.uuid)}><Download/></button>
                    {/if}
                </div>
            </li>
        {/each}
    </ul>
</div>
