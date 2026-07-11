import pptxgen from "pptxgenjs";

type Slide = {
    title: string
    bulletPoints: string[]
}

function generatePresentation(slides: Slide[]) {
    const pres = new pptxgen()
    
    pres.layout = "LAYOUT_WIDE"

    slides.forEach((slideData: Slide) => {
        const slide = pres.addSlide()

        // Dark background
        slide.background = { color: "111111" }

        // Green accent bar at top
        slide.addShape(pres.ShapeType.rect, {
            x: 0, y: 0, w: "100%", h: 0.08,
            fill: { color: "22c55e" }
        })

        // Title
        slide.addText(slideData.title, {
            x: 0.5, y: 0.3, w: 9, h: 1,
            fontSize: 32,
            bold: true,
            color: "22c55e",
            fontFace: "Arial"
        })

        // Bullet points as separate lines
        const bullets = slideData.bulletPoints.map(point => ({
            text: point,
            options: { bullet: true, color: "FFFFFF", fontSize: 16 }
        }))

        slide.addText(bullets, {
            x: 0.5, y: 1.5, w: 9, h: 4.5,
            fontFace: "Arial",
            lineSpacingMultiple: 1.4
        })

        // Bottom branding
        slide.addText("Made with Deckify", {
            x: 0.5, y: 6.8, w: 9, h: 0.3,
            fontSize: 10,
            color: "444444",
            align: "center"
        })
    })

    pres.writeFile({ fileName: "deckify-output.pptx" })
}

export default generatePresentation;