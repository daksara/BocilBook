import type { ActivityType, AgeRange, BookConfig, BookType, PageType } from "@/types";

const ACTIVITY_TO_PAGE_TYPES: Record<ActivityType, PageType[]> = {
  tracing: ["letter_tracing", "number_tracing"],
  "letter-recognition": ["letter_tracing", "find_and_circle"],
  counting: ["count_and_circle", "number_tracing"],
  coloring: ["coloring_page"],
  matching: ["match_objects"],
  "find-circle": ["find_and_circle"],
  "cut-paste": ["cut_and_paste"],
  puzzle: ["shape_recognition"],
  maze: ["maze"],
  memory: ["match_objects"],
  drawing: ["coloring_page"],
  "number-sequence": ["number_tracing"],
  "animal-classification": ["animal_classification"],
  "size-comparison": ["shape_recognition"],
};

const YOUNG_DEFAULT: ActivityType[] = ["tracing", "coloring", "matching", "counting", "find-circle"];
const MID_DEFAULT: ActivityType[] = [
  "tracing",
  "counting",
  "matching",
  "find-circle",
  "coloring",
  "animal-classification",
  "shape recognition" as ActivityType,
].filter((a) => a in ACTIVITY_TO_PAGE_TYPES) as ActivityType[];
const OLDER_DEFAULT: ActivityType[] = [
  "tracing",
  "counting",
  "matching",
  "find-circle",
  "maze",
  "cut-paste",
  "animal-classification",
  "number-sequence",
  "coloring",
];

function defaultActivitiesForAge(age: AgeRange): ActivityType[] {
  if (age === "2-3" || age === "3-5") return YOUNG_DEFAULT;
  if (age === "5-7") return MID_DEFAULT.length ? MID_DEFAULT : YOUNG_DEFAULT;
  return OLDER_DEFAULT;
}

function activitiesForBookType(bookType: BookType, age: AgeRange): ActivityType[] {
  if (bookType === "coloring-book") return ["coloring", "drawing"];
  return defaultActivitiesForAge(age);
}

/** Builds the ordered sequence of PageTypes for pages 2..N of the book. */
export function buildActivityPlan(config: BookConfig, contentPageCount: number): PageType[] {
  const activities =
    config.aiSelectActivities || config.activities.length === 0
      ? activitiesForBookType(config.bookType, config.ageRange)
      : config.activities;

  const plan: PageType[] = [];

  for (let i = 0; i < contentPageCount; i++) {
    const activity = activities[i % activities.length];
    const options = ACTIVITY_TO_PAGE_TYPES[activity] ?? ["coloring_page"];
    // Alternate between the activity's page-type options for variety
    // (e.g. "tracing" swings between letters and numbers).
    let pageType = options[0];
    if (options.length > 1) {
      if (options.includes("letter_tracing") && options.includes("number_tracing")) {
        pageType = i % 3 === 2 ? "number_tracing" : "letter_tracing";
      } else {
        pageType = options[i % options.length];
      }
    }
    plan.push(pageType);
  }

  return plan;
}
