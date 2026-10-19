import type { Metadata } from "next";
import Conversion from "./conversion";

export const metadata: Metadata = {
  title: "شكراً لتسجيلك | SOTO New Cairo",
  robots: { index: false, follow: false },
};

const WN = "201011162689";
const PD = "0101 116 2689";

export default function ThankYou() {
  return (
    <main className="relative grain min-h-svh flex items-center justify-center px-4 py-16 overflow-hidden">
      <Conversion />
      <img src="/images/texture-marble.webp" alt="" className="absolute inset-0 w-full h-full object-cover opacity-60" />
      <div className="absolute inset-0 bg-ink/60" />
      <div className="relative max-w-xl w-full text-center border hairline bg-char/80 backdrop-blur p-8 sm:p-12">
        <img src="/images/soto-logo.webp" alt="SOTO" className="w-44 mx-auto mb-8" />
        <p className="eyebrow mb-3">THANK YOU</p>
        <h1 className="text-3xl sm:text-4xl font-semibold mb-4">تم استلام طلبك بنجاح</h1>
        <p className="text-sand/75 leading-loose mb-8">
          شكراً لاهتمامك بمشروع سوتو. أحد مستشارينا هيتواصل معاك خلال وقت قصير بكل التفاصيل والأسعار وإجراءات الـ EOI.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href={`https://wa.me/${WN}?text=${encodeURIComponent("مهتم بمشروع سوتو القاهرة الجديدة - دولمن")}`} className="btn-primary">
            كلمنا واتساب
          </a>
          <a href="/" className="btn-ghost">الرجوع للصفحة الرئيسية</a>
        </div>
        <p className="mt-8 text-sm text-sand/60">
          أو اتصل بنا مباشرة: <a href="tel:+201011162689" className="lat text-lg text-sand" dir="ltr">{PD}</a>
        </p>
      </div>
    </main>
  );
}
