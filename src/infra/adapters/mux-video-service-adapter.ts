import Mux from '@mux/mux-node';
import "dotenv"

export class MuxVideoServiceAdapter {

    private readonly mux: Mux = new Mux({
        tokenId: process.env.MUX_TOKEN_ID,
        tokenSecret: process.env.MUX_TOKEN_SECRET
    });

    private readonly baseUrl: string = "https://api.mux.com"

    constructor() {}

    async getUrlForUploadVideoContent() {

        const uploadParams = {
            cors_origin: 'https://pulsemais.org.br/', 
            timeout: 3600, 
          };
          
          const response = await this.mux.video.uploads.create(uploadParams);
          const uploadUrl = response.url;

          return {
            url: uploadUrl,
            idUpload: response.id
          }
    }

   async getUploadInfoById(idUpload: string) {

        const response = await this.mux.video.uploads.retrieve(idUpload)

        console.log(response)

        return response
   }

}





