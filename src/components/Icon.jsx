const icons = {
  home:     (c) => <path d="M3 9.5L12 3l9 6.5V21H15v-5h-6v5H3V9.5z" strokeWidth="1.5" stroke={c} fill="none" strokeLinecap="round" strokeLinejoin="round"/>,
  plus:     (c) => <><line x1="12" y1="5" x2="12" y2="19" stroke={c} strokeWidth="2" strokeLinecap="round"/><line x1="5" y1="12" x2="19" y2="12" stroke={c} strokeWidth="2" strokeLinecap="round"/></>,
  minus:    (c) => <line x1="5" y1="12" x2="19" y2="12" stroke={c} strokeWidth="2" strokeLinecap="round"/>,
  chart:    (c) => <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" stroke={c} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>,
  list:     (c) => <><line x1="8" y1="6" x2="21" y2="6" stroke={c} strokeWidth="1.5" strokeLinecap="round"/><line x1="8" y1="12" x2="21" y2="12" stroke={c} strokeWidth="1.5" strokeLinecap="round"/><line x1="8" y1="18" x2="21" y2="18" stroke={c} strokeWidth="1.5" strokeLinecap="round"/><circle cx="4" cy="6" r="1" fill={c}/><circle cx="4" cy="12" r="1" fill={c}/><circle cx="4" cy="18" r="1" fill={c}/></>,
  trash:    (c) => <><polyline points="3,6 5,6 21,6" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/><path d="M19,6l-1,14H6L5,6" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/><path d="M10,11v6M14,11v6" stroke={c} strokeWidth="1.5" strokeLinecap="round" fill="none"/><path d="M9,6V4h6v2" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></>,
  edit:     (c) => <><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke={c} strokeWidth="1.5" fill="none" strokeLinecap="round"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke={c} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></>,
  back:     (c) => <polyline points="15,18 9,12 15,6" stroke={c} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>,
  calendar: (c) => <><rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke={c} strokeWidth="1.5" fill="none"/><line x1="16" y1="2" x2="16" y2="6" stroke={c} strokeWidth="1.5" strokeLinecap="round"/><line x1="8" y1="2" x2="8" y2="6" stroke={c} strokeWidth="1.5" strokeLinecap="round"/><line x1="3" y1="10" x2="21" y2="10" stroke={c} strokeWidth="1.5"/></>,
  wallet:   (c) => <><rect x="1" y="6" width="22" height="14" rx="2" stroke={c} strokeWidth="1.5" fill="none"/><path d="M1 10h22" stroke={c} strokeWidth="1.5"/><circle cx="17" cy="15" r="1.5" fill={c}/></>,
  check:    (c) => <polyline points="20,6 9,17 4,12" stroke={c} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>,
  warning:  (c) => <><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke={c} strokeWidth="1.5" fill="none"/><line x1="12" y1="9" x2="12" y2="13" stroke={c} strokeWidth="1.5" strokeLinecap="round"/><line x1="12" y1="17" x2="12.01" y2="17" stroke={c} strokeWidth="2" strokeLinecap="round"/></>,
  close:    (c) => <><line x1="18" y1="6" x2="6" y2="18" stroke={c} strokeWidth="2" strokeLinecap="round"/><line x1="6" y1="6" x2="18" y2="18" stroke={c} strokeWidth="2" strokeLinecap="round"/></>,
  qris:     (c) => <><rect x="3" y="3" width="7" height="7" stroke={c} strokeWidth="1.5" fill="none" rx="1"/><rect x="14" y="3" width="7" height="7" stroke={c} strokeWidth="1.5" fill="none" rx="1"/><rect x="3" y="14" width="7" height="7" stroke={c} strokeWidth="1.5" fill="none" rx="1"/><rect x="5" y="5" width="3" height="3" fill={c}/><rect x="16" y="5" width="3" height="3" fill={c}/><rect x="5" y="16" width="3" height="3" fill={c}/><path d="M14,14h3v3M17,17v4M14,18h3" stroke={c} strokeWidth="1.5" strokeLinecap="round" fill="none"/></>,
  cash:     (c) => <><rect x="2" y="7" width="20" height="14" rx="2" stroke={c} strokeWidth="1.5" fill="none"/><circle cx="12" cy="14" r="3" stroke={c} strokeWidth="1.5" fill="none"/><path d="M6,10v0M18,10v0M6,18v0M18,18v0" stroke={c} strokeWidth="2" strokeLinecap="round"/></>,
};

export default function Icon({ name, size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {icons[name]?.(color)}
    </svg>
  );
}
