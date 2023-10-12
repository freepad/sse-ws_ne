module.exports = {
	"plugins": [
		"@babel/syntax-dynamic-import",
		"@babel/plugin-transform-modules-commonjs"
		// [
		// "module-resolver",
		// {
		// 	"root": [
		// 		"./"
		// 	],
		// 	"alias": {
		// 		"backend:repo": "src/app/backend",
		// 		"frontend:repo": "src/app/frontend",
		// 		"@backend:repo/package": "src/app/backend/package.json",
		// 		"@frontend:repo/package": "src/app/frontend/package.json"
		// 	}
		// }
		// ]
	],
	"presets": [
		"@babel/preset-env",
		["@babel/preset-typescript", {
			"useBuiltIns": "usage",
			"corejs": 3
		}]
	],
	"targets": {
		"browsers": ["last 5 version", "not IE 11", "> 1%"]
	},
	"ignore": [
		"src/index.js",
		"app/frontend/src/index.js",
		"app/backend/src/index.js"
	]
	// "env": {
	// "backend:repo": "./src/app/backend/babel.config.js",
	// {
	// "presets": [
	// 	[
	// 		"@babel/preset-env",
	// 		{
	// 			"plugins": [
	// 				"@babel/plugin-transform-modules-commonjs"
	// 			]
	// 		},
	// 		{
	// 			"targets": {
	// 				"node": "node 18"
	// 			}
	// 		}
	// 	],
	// 	[
	// 		"@babel/preset-typescript",
	// 		{
	// 			"useBuiltIns": "usage",
	// 			"corejs": 3
	// 		}
	// 	]
	// ]
	// },
	// "frontend:repo": "./src/app/frontend/babel.config.js"
	// {
	// "presets": [
	// 	[
	// 		"@babel/preset-env",
	// 			{
	// 				"plugins": [
	// 					"@babel/plugin-transform-modules-commonjs"
	// 				]
	// 			},
	// 			{
	// 				"targets": {
	// 				"browser": "last 5 version, not IE 11, > 1%"
	// 			}
	// 		}
	// 	],
	// 	[
	// 		"@babel/preset-typescript",
	// 		{
	// 			"useBuiltIns": "usege",
	// 			"corejs": 3
	// 		}
	// 	]
	// ]
	// }
	// }
	// "env": {
	//   "test": {
	//     "presets": [
	//       [
	//         {
	//           "plugins": [
	// 						"@babel/plugin-transform-modules-commonjs",
	//           ]
	//         },
	//         {
	//           "targets": {
	//             "node": "current"
	//           }
	//         }
	//       ],
	// 			[
	// 				"@babel/preset-typescript",
	// 				{
	// 					"useBuiltIns": "usege",
	// 					"corejs": 3
	// 				}
	// 			]
	// 		]
	//   }
	// }
	// "presets": [
	// 	"@babel/preset-env"
	// ]
}
