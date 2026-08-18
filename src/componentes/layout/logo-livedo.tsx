import { cn } from "@/lib/utils";

export function LogoLivedo({
  compacto = false,
  claro = true,
  onClick,
  ariaLabel,
}: {
  compacto?: boolean;
  claro?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
}) {
  const conteudo = (
    <>
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-secondary text-sm font-bold text-white shadow-[0_12px_24px_rgba(47,107,255,0.28)]">
        Lv
      </div>
      {!compacto ? (
        <div className="leading-tight">
          <p className={claro ? "text-sm font-[700] text-white" : "text-sm font-[700] text-foreground"}>Livedo</p>
          <p className={claro ? "text-xs text-white/55" : "text-xs text-muted-foreground"}>Atendimento inteligente</p>
        </div>
      ) : null}
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "flex min-w-0 items-center gap-3 rounded-2xl text-left outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-white/60",
          compacto && "justify-center",
        )}
        aria-label={ariaLabel}
        title={ariaLabel}
      >
        {conteudo}
      </button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {conteudo}
    </div>
  );
}
