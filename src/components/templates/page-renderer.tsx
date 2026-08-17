import type { BookStyle, Page } from "@/types";
import { CoverTemplate } from "./cover-template";
import { LetterTracingTemplate } from "./letter-tracing-template";
import { NumberTracingTemplate } from "./number-tracing-template";
import { CountAndCircleTemplate } from "./count-and-circle-template";
import { MatchObjectsTemplate } from "./match-objects-template";
import { FindAndCircleTemplate } from "./find-and-circle-template";
import { ColoringPageTemplate } from "./coloring-page-template";
import { MazeTemplate } from "./maze-template";
import { CutAndPasteTemplate } from "./cut-and-paste-template";
import { ShapeRecognitionTemplate } from "./shape-recognition-template";
import { AnimalClassificationTemplate } from "./animal-classification-template";

export function PageRenderer({
  page,
  style,
  totalPages,
  className,
}: {
  page: Page;
  style: BookStyle;
  totalPages: number;
  className?: string;
}) {
  const props = { style, pageNumber: page.pageNumber, totalPages, className };

  switch (page.data.type) {
    case "cover":
      return <CoverTemplate title={page.title} data={page.data} style={style} />;
    case "letter_tracing":
      return <LetterTracingTemplate data={page.data} {...props} />;
    case "number_tracing":
      return <NumberTracingTemplate data={page.data} {...props} />;
    case "count_and_circle":
      return <CountAndCircleTemplate data={page.data} {...props} />;
    case "match_objects":
      return <MatchObjectsTemplate data={page.data} {...props} />;
    case "find_and_circle":
      return <FindAndCircleTemplate data={page.data} {...props} />;
    case "coloring_page":
      return <ColoringPageTemplate data={page.data} {...props} />;
    case "maze":
      return <MazeTemplate data={page.data} {...props} />;
    case "cut_and_paste":
      return <CutAndPasteTemplate data={page.data} {...props} />;
    case "shape_recognition":
      return <ShapeRecognitionTemplate data={page.data} {...props} />;
    case "animal_classification":
      return <AnimalClassificationTemplate data={page.data} {...props} />;
    default:
      return null;
  }
}
