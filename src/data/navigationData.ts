import type {MegaMenu, NavItem} from "~/types/navbar";

export const mainNavItems: NavItem[] = [
    {name: 'Home', href: '#'},
    {name: 'Shop', href: '#', hasMega: true},
    {name: 'Blog', href: '#'},
    {name: 'Portfolio', href: '#'},
    {name: 'Pages', href: '#'},
]


export const megaMenu: MegaMenu[] = [
    {
        sectionName: 'Shop Structure',
        data: [
            {name: 'Shop Standard', href: '#'},
            {name: 'Shop List', href: '#'},
            {name: 'Shop With Category', href: '#'},
            {name: 'Shop Filters Top Bar', href: '#'},
            {name: 'Shop Sidebar', href: '#'},
            {name: 'Shop Style 1', href: '#'},
            {name: 'Shop Style 2', href: '#'}
        ]
    },
    {
        sectionName: 'Product Structure',
        data: [
            {name: 'Default', href: '#'},
            {name: 'Thumbnail', href: '#'},
            {name: 'Grid Media', href: '#'},
            {name: 'Carousel', href: '#'},
            {name: 'Full Width', href: '#'}
        ]
    },
    {
        sectionName: 'Shop Pages',
        data: [
            {name: 'Wishlist', href: '#'},
            {name: 'Cart', href: '#'},
            {name: 'Checkout', href: '#'},
            {name: 'Compare', href: '#'},
            {name: 'Order Tracking', href: '#'},
            {name: 'Login', href: '#'},
            {name: 'Registration', href: '#'},
            {name: 'Forget Password', href: '#', isNew: true}
        ]
    }
]