import { UrlObject } from 'url';
import { ReactNode } from 'react';
import Link from 'next/link';

export function NavLink(props: {
  href: string | UrlObject;
  children: ReactNode;
}) {
  return (
    <Link
      className="rounded-md px-4 py-2 text-purple-500 font-semibold hover:bg-purple-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
      href={props.href}
    >
      {props.children}
    </Link>
  );
}
