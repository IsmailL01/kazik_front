import type { NextConfig } from 'next';
import path from 'path';

const sassOptions = {
	includePaths: [path.join(__dirname, 'styles')],
	prependData: "@use '@/shared/styles/main' as *;",
};

const nextConfig: NextConfig = {
	reactCompiler: true,
	// turbopack: {
	// 	resolveAlias: {
	// 		'@styles/*': 'src/styles/*',
	// 	},
	// },
	sassOptions: {
		...sassOptions,
	},

	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com',
			},
		],
	},
};

export default nextConfig;
