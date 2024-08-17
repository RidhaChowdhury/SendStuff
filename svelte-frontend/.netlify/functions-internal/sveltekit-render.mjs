import { init } from '../serverless.js';

export const handler = init((() => {
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
		client: {"start":"_app/immutable/entry/start.ClmsCSBA.js","app":"_app/immutable/entry/app.D2bJl85c.js","imports":["_app/immutable/entry/start.ClmsCSBA.js","_app/immutable/chunks/entry.NXxB6QZb.js","_app/immutable/chunks/runtime.DwJk_5Kx.js","_app/immutable/entry/app.D2bJl85c.js","_app/immutable/chunks/runtime.DwJk_5Kx.js","_app/immutable/chunks/render.SAQhV7AZ.js","_app/immutable/chunks/disclose-version.ctcErQuM.js","_app/immutable/chunks/index-client.dW6AtjtT.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('../server/nodes/0.js')),
			__memo(() => import('../server/nodes/1.js')),
			__memo(() => import('../server/nodes/2.js'))
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
})());
