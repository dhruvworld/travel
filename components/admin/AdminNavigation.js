'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AdminNavigation;
var link_1 = require("next/link");
var navigation_1 = require("next/navigation");
function AdminNavigation() {
    var pathname = (0, navigation_1.usePathname)();
    var adminLinks = [
        { href: '/admin/dashboard', label: 'Dashboard' },
        { href: '/admin/bookings', label: 'Bookings' },
        { href: '/admin/packages', label: 'Packages' },
        { href: '/admin/top-destinations', label: 'Featured Packages' },
        { href: '/admin/gallery', label: 'Gallery' },
        { href: '/admin/offers', label: 'Offers' },
        { href: '/admin/photos', label: 'Photos' },
        { href: '/admin/upload', label: 'Upload' },
    ];
    return (<nav className="bg-white shadow rounded-lg p-4">
      <ul className="space-y-2">
        {adminLinks.map(function (link) { return (<li key={link.href}>
            <link_1.default href={link.href} className={"flex items-center p-2 rounded-md ".concat(pathname === link.href
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:bg-gray-100')}>
              {link.icon && <span className="mr-2">{link.icon}</span>}
              <span>{link.label}</span>
            </link_1.default>
          </li>); })}
      </ul>
    </nav>);
}
