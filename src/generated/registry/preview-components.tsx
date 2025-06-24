
import { PreviewComponents } from "@/types";

export const PREVIEW_COMPONENTS: PreviewComponents = {
	"_exemples/hello-world/hello.tsx":() => import("../../../_exemples/hello-world/hello"),
	"_exemples/field-range-date-time/preview.tsx":() => import("../../../_exemples/field-range-date-time/preview"),
	"_exemples/field-range-date-time/page.tsx":() => import("../../../_exemples/field-range-date-time/page")
};
