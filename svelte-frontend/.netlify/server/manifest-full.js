export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.CBSwlM9i.js","app":"_app/immutable/entry/app.CUJ3LsuV.js","imports":["_app/immutable/entry/start.CBSwlM9i.js","_app/immutable/chunks/entry.DU0A7RHO.js","_app/immutable/chunks/runtime.DwJk_5Kx.js","_app/immutable/entry/app.CUJ3LsuV.js","_app/immutable/chunks/runtime.DwJk_5Kx.js","_app/immutable/chunks/render.SAQhV7AZ.js","_app/immutable/chunks/disclose-version.ctcErQuM.js","_app/immutable/chunks/index-client.dW6AtjtT.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
