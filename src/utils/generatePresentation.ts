import pptxgen from "pptxgenjs";
function generatePresentation(slides:Slide[]) {
    const pres = new pptxgen()
    slides.forEach((slideData: Slide) => {
        const slide = pres.addSlide()
        slide.addText(slideData.title, { x: 0.5, y: 0.5,w:9,h:1, fontSize: 28, bold: true })
        slide.addText(slideData.bulletPoints.join("\n"), { x: 0.5, y: 1.5,w:9,h:1, fontSize: 16 })
    })
    pres.writeFile({ fileName: "deckify-output.pptx" })
}
type Slide = {
    title: string
    bulletPoints: string[]
}

export default generatePresentation;