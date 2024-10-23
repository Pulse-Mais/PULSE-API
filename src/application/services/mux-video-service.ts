import Mux from '@mux/mux-node';
import { Buffer } from 'buffer';
import { IVideoService } from '../interfaces/IVideo-service';

export class MuxVideoService implements IVideoService {

    constructor(
        private readonly client: Mux = new Mux({
            tokenId: process.env.MUX_TOKEN_ID,
            tokenSecret: process.env.MUX_TOKEN_SECRET
        })
    ) { }

    async getUrlToDirectUploadVideo() {
        const upload = await this.client.video.uploads.create({
            new_asset_settings: {
                playback_policy: ['public'],
            },
            cors_origin: '*'
        });
        console.log('UPLOADDDDDDDDDD', upload)
        return {
            endpoint: upload.url,
            uploadId: upload.id
        };
    }

    async uploadWithDirectEndpoint(videoBuffer: any) {
        const upload = await this.getUrlToDirectUploadVideo();
        return await fetch(upload.endpoint, {
            method: 'PUT',
            body: videoBuffer.buffer,
            headers: {
                'Content-Type': 'video/mp4'  
            }
        });
    }

    // Upload normal diretamente criando um ativo de vídeo na MUX
    // async normalUpload(videoBuffer: ReadableStream, videoTitle: string) {
    //     const videoFile = {
    //         input: videoBuffer,
    //         playback_policy: ['public' as 'public'], // Corrigido
    //         name: videoTitle
    //     };

    //     try {
    //         // Cria um ativo de vídeo diretamente na MUX
    //         const asset = await this.client.video.assets.create(videoFile);
    //         return asset;
    //     } catch (error) {
    //         console.error('Erro ao criar o ativo de vídeo:', error);
    //         throw new Error('Falha ao fazer o upload do vídeo para a MUX.');
    //     }
    // }

    // Método para obter status do vídeo
    async getVideoStatus(assetId: string) {
        try {
            // O método correto é 'retrieve', que substitui o 'get'
            const asset = await this.client.video.assets.retrieve(assetId);
            return asset.status;
        } catch (error) {
            console.error('Erro ao obter status do vídeo:', error);
            throw new Error('Falha ao obter status do vídeo.');
        }
    }

    // Método para obter a URL de playback
    async getPlaybackUrl(assetId: string) {
        try {
            const asset = await this.client.video.assets.retrieve(assetId); // Correção aqui
            if (!asset.playback_ids || asset.playback_ids.length === 0) {
                throw new Error('Nenhum ID de playback encontrado.');
            }

            const playbackId = asset.playback_ids[0].id;
            return `https://stream.mux.com/${playbackId}.m3u8`;
        } catch (error) {
            console.error('Erro ao obter URL de playback:', error);
            throw new Error('Falha ao obter URL de playback.');
        }
    }
}
