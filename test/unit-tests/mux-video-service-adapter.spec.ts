import { MuxVideoServiceAdapter } from "../../src/infra/adapters/mux-video-service-adapter"


describe("Mux testing", () => {
    const mux = new MuxVideoServiceAdapter()

    it("Testando como é a URL", async  () => {

        const data = await mux.getUrlForUploadVideoContent()

        console.log(data)

        console.log(data.url)

        console.log(data.idUpload)

        expect(data).toBeTruthy()


        // const teste = await mux.getVideoInfoByUploadId(data.idUpload)

        // console.log("O teste é:", teste)
    })

   


})