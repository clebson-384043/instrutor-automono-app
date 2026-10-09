import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
};

export const CheckIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export const ShieldIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const HeartIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 12 5.5 5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z" />
  </svg>
);

export const KeyIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="7.5" cy="15.5" r="5.5" />
    <path d="m21 2-9.6 9.6M15.5 7.5l3 3L22 7l-3-3" />
  </svg>
);

export const SmartphoneIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="5" y="2" width="14" height="20" rx="2" />
    <path d="M12 18h.01" />
  </svg>
);

export const ClipboardIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="8" y="2" width="8" height="4" rx="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <path d="m9 14 2 2 4-4" />
  </svg>
);

export const CarIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 10l-2.7-3.4A2 2 0 0 0 13.7 6H8.5a2 2 0 0 0-1.7.9L4.5 10 3 10.5c-.6.2-1 .8-1 1.5v4c0 .6.4 1 1 1h2" />
    <circle cx="7" cy="17" r="2" />
    <circle cx="17" cy="17" r="2" />
    <path d="M9 17h6" />
  </svg>
);

export const UserIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21a8 8 0 0 1 16 0" />
  </svg>
);

export const ArrowRightIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export const ChevronDownIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const ChevronLeftIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m15 18-6-6 6-6" />
  </svg>
);

export const ChevronRightIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export const MenuIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

export const XIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

export const MailIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-10 6L2 7" />
  </svg>
);

export const MapPinIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const StarIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1Z" />
  </svg>
);

export const WhatsAppIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.27.49 1.7.63.72.23 1.37.2 1.88.12.58-.09 1.75-.72 2-1.4.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35ZM12.04 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.93.95-3.48-.22-.36a9.42 9.42 0 0 1-1.44-5.02C2.6 6.86 6.84 2.6 12.05 2.6a9.4 9.4 0 0 1 9.43 9.45c0 5.2-4.24 9.45-9.44 9.45Zm8.03-17.48A11.3 11.3 0 0 0 12.04.7C5.8.7.7 5.8.7 12.05c0 2 .52 3.95 1.52 5.66L.6 23.6l6.03-1.58a11.3 11.3 0 0 0 5.4 1.38h.01c6.25 0 11.34-5.1 11.35-11.35 0-3.03-1.18-5.88-3.32-8.03Z" />
  </svg>
);

export const InstagramIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <path d="M17.5 6.5h.01" />
  </svg>
);

export const FacebookIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3Z" />
  </svg>
);

export const YoutubeIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M2.5 17a24 24 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.6 49.6 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24 24 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.6 49.6 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3Z" />
  </svg>
);
