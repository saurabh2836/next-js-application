/** @type {import('next').NextConfig} */

const nextConfig = {
       experimental:{
        serverActions: {
            allowedOrigins: ['*'],
          },
        mdxRs:true,
        serverComponentsExternalPackages:['mongoose']
       }
};

export default nextConfig;
