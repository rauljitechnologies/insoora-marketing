import { SolutionRoute, solutionMetadata } from "@/components/marketing/solution-page";
import { page } from "@/lib/solutions/pages/insurance-document-management-software";

// A thin route. The content is in `lib/solutions/pages`, the layout is in
// `components/marketing/solution-page`, and the canonical URL is derived from
// `page.slug` — so the directory name and the slug cannot disagree without
// `lib/solutions` failing the build. See the notes in both of those files.

export const metadata = solutionMetadata(page);

export default function Page() {
  return <SolutionRoute page={page} />;
}
