
import { PreviewComponents } from "@/types";

export const PREVIEW_COMPONENTS: PreviewComponents = {
	"../_exemples/hello-world/hello.tsx":() => import("../../_exemples/hello-world/hello"),
	"../_exemples/field-root/preview.tsx":() => import("../../_exemples/field-root/preview")
};
