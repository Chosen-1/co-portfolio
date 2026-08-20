type FooterProps = {
  name: string;
};

export default function Footer({ name }: FooterProps) {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-center sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:text-left">
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} {name}. All rights reserved.
        </p>

        <a
          href="#top"
          className="text-sm font-medium text-blue-700 transition hover:text-blue-800"
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}