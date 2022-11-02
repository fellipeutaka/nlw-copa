import { ButtonHTMLAttributes, forwardRef } from "react";

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => (
  <button
    className="bg-amber-300 transition-all hover:bg-amber-400 focus-visible:ring-2 focus-visible:ring-amber-400 outline-none text-zinc-900 px-6 py-4 rounded font-bold text-sm uppercase"
    {...props}
    ref={ref}
  />
));

Button.displayName = "Button";
