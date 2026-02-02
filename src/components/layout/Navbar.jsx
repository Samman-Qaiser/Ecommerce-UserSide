import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { menuData } from '../../data/menudata';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu"
import TypingBanner from '../ui/TypingBanner';
import CartSidebar from '../../Pages/CartSidebar';
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const itemCount = 0; // Redux Toolkit se baad mein replace karenge
  const navigate = useNavigate();

 useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 10); // correct
  };
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);


  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

const cartItems = [
  {
    id: 1,
    name: 'ETHNIC CHARM',
    price: 5200,
    quantity: 1,
    badge: 'SALE',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=500',
  },
  {
    id: 2,
    name: 'SUMMER BREEZE',
    price: 3200,
    quantity: 2,
    badge: 'TOP RATED',
    image: 'https://images.unsplash.com/photo-1606522321798-c51a9b286e0a?w=500',
  },
]

  return (
    <>
      {/* Main Header */}
<TypingBanner />

      <header className={cn(
        "sticky top-0 z-50 w-full bg-white border-b transition-shadow duration-300",
        isScrolled && "shadow-md"
      )}>
        {/* Top Row: Logo + Menu + Icons */}
        <div className="border-b">

          <div className="flex   justify-between px-4 lg:px-8">

            {/* Logo - Left */}
            <div className="flex items-center gap-6">
              {/* Mobile Menu */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 p-0">
                  <MobileMenu onClose={() => setIsMobileMenuOpen(false)} />
                </SheetContent>
              </Sheet>

              {/* Logo */}
              <Link to="/" className="flex items-center">
                <svg width="80" height="40" viewBox="0 0 80 40" className="text-gray-900">
                  <text x="0" y="30" fontFamily="'Brush Script MT', cursive" fontSize="32" fill="currentColor">
                    Suta
                  </text>
                </svg>
              </Link>
            </div>

            {/* Center Menu - Desktop Only */}
            <nav className="hidden lg:flex w-[80%] justify-center  flex-wrap items-center space-x-6 xl:space-x-8">
              {menuData.topMenu.map((item) =>
                item.hasDropdown ? (
                  <DropdownMenu key={item.id}>
                    <DropdownMenuTrigger
                      className={cn(
                        "text-sm font-medium flex items-center gap-1 py-6 outline-none",
                        item.highlighted ? "text-red-600" : "text-gray-900"
                      )}
                    >
                      {item.label}
                      <ChevronDown className="h-3 w-3" />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="start" className="min-w-65">
                      {item.submenu.map((section, idx) => (
                        <DropdownMenuSub key={idx}>
                          <DropdownMenuSubTrigger className="font-semibold">
                            {section.category}
                          </DropdownMenuSubTrigger>

                          <DropdownMenuSubContent className="min-w-65">
                            {section.items.map((subItem, subIdx) =>
                              subItem.subcategories ? (
                                <DropdownMenuSub key={subIdx}>
                                  <DropdownMenuSubTrigger>
                                    {subItem.label}
                                  </DropdownMenuSubTrigger>

                                  <DropdownMenuSubContent className="min-w-55">
                                    {subItem.subcategories.map((child, i) => (
                                      <DropdownMenuItem key={i} asChild>
                                        <Link to={child.href}>{child.label}</Link>
                                      </DropdownMenuItem>
                                    ))}
                                  </DropdownMenuSubContent>
                                </DropdownMenuSub>
                              ) : (
                                <DropdownMenuItem key={subIdx} asChild>
                                  <Link to={subItem.href}>{subItem.label}</Link>
                                </DropdownMenuItem>
                              )
                            )}
                          </DropdownMenuSubContent>
                        </DropdownMenuSub>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    key={item.id}
                    to={item.href}
                    className={cn(
                      "text-sm font-medium py-6",
                      item.highlighted ? "text-red-600" : "text-gray-900"
                    )}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>


            {/* Right Icons */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="size-5" />
              </Button>

               <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button variant="ghost" size="icon">
                  <User className="size-5" />
                </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='p-4 w-48 space-y-2 cursor-pointer'>
                  <h1 className='text-xl text-center'>WELCOME</h1>
                  <DropdownMenuItem>
                  <div className='bg-black text-lg text-white p-2'>
                    <span>Login</span>/<span>SignUp</span>
                  </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem><Link to='/orders'>Orders</Link></DropdownMenuItem>
                  <DropdownMenuItem><Link to='/adresses'>Adresses</Link></DropdownMenuItem>
                </DropdownMenuContent>
               </DropdownMenu>
<CartSidebar cartItems={cartItems}>
  <Button variant="ghost" size="icon" className="relative">
    <>
      <ShoppingBag className="size-5" />
      {itemCount > 0 && (
        <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
          {itemCount}
        </Badge>
      )}
    </>
  </Button>
</CartSidebar>


            </div>
          </div>

        </div>


      </header>

      {/* Search Modal */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />
    </>
  );
}

// Mega Dropdown with Multi-level Support
function MegaDropdown({ submenu, activeSubDropdown, setActiveSubDropdown }) {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-full w-screen max-w-6xl bg-white shadow-xl border-t z-50">
      <div className="p-8">
        <div className="grid grid-cols-4 gap-8">
          {submenu.map((section, idx) => (
            <div key={idx} className="relative">
              <h3 className="font-semibold text-sm text-gray-900 mb-4 uppercase tracking-wide">
                {section.category}
              </h3>
              <ul className="space-y-2">
                {section.items.map((item, itemIdx) => (
                  <li
                    key={itemIdx}
                    className="relative"
                    onMouseEnter={() => item.subcategories && setActiveSubDropdown(`${idx}-${itemIdx}`)}
                    onMouseLeave={() => !item.subcategories && setActiveSubDropdown(null)}
                  >
                    <Link
                      to={item.href}
                      className="text-sm text-gray-600 hover:text-gray-900 transition-colors flex items-center justify-between group"
                    >
                      <span>{item.label}</span>
                      {item.subcategories && (
                        <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </Link>

                    {/* Sub-submenu (3rd level) */}
                    {item.subcategories && activeSubDropdown === `${idx}-${itemIdx}` && (
                      <div className="absolute left-full top-0 ml-2 w-48 bg-white shadow-lg border rounded-md p-4 z-50">
                        <ul className="space-y-2">
                          {item.subcategories.map((subItem, subIdx) => (
                            <li key={subIdx}>
                              <Link
                                to={subItem.href}
                                className="text-sm text-gray-600 hover:text-gray-900 transition-colors block"
                              >
                                {subItem.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Mobile Menu
function MobileMenu({ onClose }) {
  const [openMenu, setOpenMenu] = useState(null);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  return (
    <>
      <div className='text-center bg-accent text-white p-2'>CASH ON DELIVERY AVAILABLE</div>
      <div className="flex flex-col h-full bg-white">
        <div className="flex items-center justify-between p-6 border-b">
          <span className="text-2xl font-bold">Suta</span>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto p-6">
          {/* Top Menu */}
          <ul className="space-y-1">
            {menuData.topMenu.map((item) => (
              <li key={item.id}>
                {item.hasDropdown ? (
                  <>
                    <button
                      onClick={() => setOpenMenu(openMenu === item.id ? null : item.id)}
                      className={cn(
                        "flex items-center justify-between w-full py-3 text-sm font-medium transition-colors",
                        item.highlighted ? "text-red-600" : "text-gray-900"
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform",
                          openMenu === item.id && "rotate-180"
                        )}
                      />
                    </button>

                    {openMenu === item.id && (
                      <div className="pl-4 mt-2 space-y-3 border-l-2">
                        {item.submenu.map((section, idx) => (
                          <div key={idx}>
                            <button
                              onClick={() => setOpenSubmenu(openSubmenu === idx ? null : idx)}
                              className="flex items-center justify-between w-full text-xs font-semibold text-gray-500 uppercase mb-2"
                            >
                              {section.category}
                              {section.items.some(i => i.subcategories) && (
                                <ChevronDown className="h-3 w-3" />
                              )}
                            </button>

                            <ul className="space-y-2">
                              {section.items.map((subItem, subIdx) => (
                                <li key={subIdx}>
                                  {subItem.subcategories ? (
                                    <>
                                      <button
                                        onClick={() => setOpenSubmenu(`${idx}-${subIdx}`)}
                                        className="flex items-center justify-between w-full py-1 text-sm text-gray-600"
                                      >
                                        {subItem.label}
                                        <ChevronRight className="h-3 w-3" />
                                      </button>

                                      {openSubmenu === `${idx}-${subIdx}` && (
                                        <ul className="pl-4 mt-1 space-y-1">
                                          {subItem.subcategories.map((sub, i) => (
                                            <li key={i}>
                                              <Link
                                                to={sub.href}
                                                onClick={onClose}
                                                className="block py-1 text-xs text-gray-500"
                                              >
                                                {sub.label}
                                              </Link>
                                            </li>
                                          ))}
                                        </ul>
                                      )}
                                    </>
                                  ) : (
                                    <Link
                                      to={subItem.href}
                                      onClick={onClose}
                                      className="block py-1 text-sm text-gray-600"
                                    >
                                      {subItem.label}
                                    </Link>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.href}
                    onClick={onClose}
                    className={cn(
                      "block py-3 text-sm font-medium",
                      item.highlighted ? "text-red-600" : "text-gray-900"
                    )}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>


        </nav>
      </div>
    </>

  );
}

// Search Overlay
 function SearchOverlay({ isOpen, onClose, searchQuery, setSearchQuery, handleSearch }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl w-full mx-4">
        <DialogHeader className="flex items-center justify-between">
          <DialogTitle>Search Products</DialogTitle>
       
        </DialogHeader>

        <form onSubmit={handleSearch} className="flex gap-2 mt-4">
          <Input
            type="text"
            placeholder="Search for sarees, suits, kurtas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
            autoFocus
          />
          <Button type="submit" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Search
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

