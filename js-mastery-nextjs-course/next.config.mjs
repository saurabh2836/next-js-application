/** @type {import('next').NextConfig} */

const nextConfig = {
       experimental:{
        serverActions: {
            allowedOrigins: ['*'],
          },
        mdxRs:true,
        serverComponentsExternalPackages:['mongoose']
       },
       swcMinify: true,
       images:{
        remotePatterns:[
          {
            protocol:'https',
            hostname:'*'
          },
          {
            protocol:'http',
            hostname:'*'
          }
        ]
       }
};

export default nextConfig;
