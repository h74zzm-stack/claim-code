import { getClaim } from "../data";
import Details from "./details";

export function generateMetadata({ params }) {
  return { title: `${params.id} | كودك | Kodak` };
}

export default function ClaimPage({ params }) {
  // المطالبات الجديدة محفوظة في المتصفح، فيبحث عنها المكوّن هناك إذا لم تكن في البيانات التجريبية
  return <Details claim={getClaim(params.id) ?? null} id={params.id} />;
}
