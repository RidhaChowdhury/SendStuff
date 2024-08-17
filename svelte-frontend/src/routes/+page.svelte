<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { Paperclip, Clipboard, Send, Copy, Download } from 'lucide-svelte';

    let items: Array<{
        uuid: string;
        original_name: string;
        expiry_time: string;
        file_type: string;
        is_expired: boolean;
        expiry_text?: string;
    }> = [];
    let text: string = '';
    let days: number = 1;
    let interval: NodeJS.Timeout;

    async function uploadFile(event: Event) {
        const input = event.target as HTMLInputElement;
        const file = input?.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('days', days.toString());
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
        formData.append('days', days.toString());
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
        items = data.map((item: any) => {
            const expiryDate = new Date(item.expiry_time);
            const currentTime = new Date();
            const diffHours = Math.ceil((expiryDate.getTime() - currentTime.getTime()) / 3600000);
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

    async function copyToClipboard(uuid: string) {
        const response = await fetch(`https://fastapi.ridhachowdhury.com/fetch_text/${uuid}`);
        const data = await response.json();
        navigator.clipboard.writeText(data.content).then(() => {
            alert("Text copied to clipboard");
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    }

    async function downloadFile(uuid: string) {
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

    function adjustTextareaHeight(event: Event) {
        const textarea = event.target as HTMLTextAreaElement;
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

<div id="app" class="w-full p-4">
    <h2 class="text-2xl font-semibold mb-4 text-light">Send Stuff</h2>

    <div class="upload-container flex items-start gap-2 mb-5 w-full">
        <input id="file-upload" type="file" class="hidden" on:change="{uploadFile}">

        <button type="button" class="w-12 h-12 rounded-lg border border-secondary bg-secondary text-light flex items-center justify-center text-xl transition duration-300 ease-in-out hover:bg-accent" on:click="{() => document.getElementById('file-upload')!.click()}">
        <Paperclip />
        </button>

        <button type="button" class="w-12 h-12 rounded-lg border border-secondary bg-secondary text-light flex items-center justify-center text-xl transition duration-300 ease-in-out hover:bg-accent" on:click="{pasteFromClipboard}">
        <Clipboard />
        </button>

        <textarea bind:value="{text}" placeholder="Enter your text here" required on:input="{adjustTextareaHeight}" class="flex-grow p-2 border border-secondary bg-secondary text-light rounded-lg text-base resize-none overflow-hidden h-12 min-h-12 box-border"></textarea>

        <button type="button" class="w-12 h-12 rounded-lg border border-secondary bg-secondary text-light flex items-center justify-center text-xl transition duration-300 ease-in-out hover:bg-accent" on:click="{uploadText}">
        <Send />
        </button>
    </div>

    <ul class="list-none p-0 m-0">
        {#each items as item}
        <li class="bg-secondary mb-2 p-4 rounded-lg flex justify-between items-center border-l-4 border-accent">
            <div class="file-info flex flex-col items-center">
                <div class="text-light">{item.original_name}</div>
                <span class="text-sm text-light text-center">{item.expiry_text}</span>
            </div>

            <div class="file-actions flex gap-2">
                {#if item.file_type === 'text'}
                    <button type="button" class="w-10 h-10 rounded-lg bg-secondary text-light flex items-center justify-center text-lg transition duration-300 ease-in-out hover:bg-accent" on:click="{() => copyToClipboard(item.uuid)}">
                    <Copy />
                    </button>
                {:else}
                    <button type="button" class="w-10 h-10 rounded-lg bg-secondary text-light flex items-center justify-center text-lg transition duration-300 ease-in-out hover:bg-accent" on:click="{() => downloadFile(item.uuid)}">
                    <Download />
                    </button>
                {/if}
            </div>
        </li>
        {/each}
    </ul>
</div>
