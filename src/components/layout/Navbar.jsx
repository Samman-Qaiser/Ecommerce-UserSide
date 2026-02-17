// components/Navbar.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingBag,
  User,
  Menu,
  ChevronDown,
  Heart,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useNavigationMenu } from "../../data/useNavigationMenu";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import TypingBanner from "../ui/TypingBanner";
import CartSidebar from "../CartSidebar";
import { useSelector } from "react-redux";
import SearchOverlay from "../search/SearchOverlay";
import { useAuth } from "../../tanstackhooks/useAuth";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { user, isAuthenticated, isGuest } = useSelector((state) => state.auth);
  const { signOut } = useAuth();
  
  const itemCount = 0; 
  const { menuData, isLoading } = useNavigationMenu();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <>
      <TypingBanner />

      <header
        className={cn(
          "sticky top-0 z-50 w-full bg-white border-b transition-shadow duration-300",
          isScrolled && "shadow-md",
        )}
      >
        <div className="border-b">
          <div className="flex justify-between px-4 lg:px-8">
            {/* Logo - Left */}
            <div className="flex items-center gap-6">
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

              <Link to="/" className="flex items-center">
                <img src="/logo.jpeg" className="w-30 h-20 hidden lg:inline" alt="Logo" />
              </Link>
            </div>

            {/* Center Menu - Desktop Only */}
            <nav className="hidden lg:flex w-[80%] justify-center flex-wrap items-center space-x-6 xl:space-x-8">
              {menuData.topMenu.map((item) => {
                // Agar placeholder hai to click disable karo
                const isClickable = !item.isPlaceholder;

                return item.hasDropdown ? (
                  <DropdownMenu key={item.id}>
                    <DropdownMenuTrigger 
                      disabled={!isClickable}
                      className={cn(
                        "text-sm flex items-center gap-1 py-6 outline-none",
                        isClickable ? "text-gray-900 hover:text-gray-600" : "text-gray-900 cursor-default",
                        item.highlighted && "text-red-600"
                      )}
                    >
                      {item.label}
                      <ChevronDown className="h-3 w-3" />
                    </DropdownMenuTrigger>
                    
                    {isClickable && (
                      <DropdownMenuContent align="start" className="min-w-50 max-h-100 overflow-y-auto">
                        {item.items?.map((subItem) => (
                          <DropdownMenuItem key={subItem.id} asChild>
                            <Link 
                              to={subItem.href} 
                              className="cursor-pointer hover:bg-gray-50"
                            >
                              {subItem.label}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    )}
                  </DropdownMenu>
                ) : (
                  isClickable ? (
                    <Link 
                      key={item.id} 
                      to={item.href}
                      className={cn(
                        "text-sm py-6 hover:text-gray-600 transition-colors",
                        item.highlighted ? "text-red-600" : "text-gray-900"
                      )}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span
                      key={item.id}
                      className="text-sm py-6 text-gray-900 cursor-default"
                    >
                      {item.label}
                    </span>
                  )
                );
              })}
            </nav>

            {/* Right Icons */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
                <Search className="size-5" />
              </Button>

              <SearchOverlay open={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

              <Link to="/wishlist">
                <Heart className="cursor-pointer size-5 hover:text-red-500 transition-colors" />
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="size-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="p-2 w-56">
                  {!isGuest && isAuthenticated ? (
                    <>
                      <div className="px-2 py-1.5 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                        Welcome, {user?.fullName?.split(" ")[0]}
                      </div>
                      <DropdownMenuSeparator />
                    </>
                  ) : (
                    <DropdownMenuItem asChild>
                      <Link to="/login" className="w-full">
                        <div className="bg-black text-white p-2 text-center rounded w-full font-medium hover:bg-gray-800 transition-colors">
                          Login / Sign Up
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuItem asChild>
                    <Link to="/orders">My Orders</Link>
                  </DropdownMenuItem>
                  
                  {!isGuest && isAuthenticated && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={handleLogout}
                        className="text-red-600 focus:text-red-600 cursor-pointer flex items-center gap-2"
                      >
                        <LogOut className="size-4" />
                        <span>Logout</span>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              <CartSidebar cartItems={[]}>
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingBag className="size-5" />
                  {itemCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {itemCount}
                    </Badge>
                  )}
                </Button>
              </CartSidebar>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

// Mobile Menu
function MobileMenu({ onClose }) {
  const [openMenu, setOpenMenu] = useState(null);
  const { menuData } = useNavigationMenu();
  const { isAuthenticated, isGuest } = useSelector((state) => state.auth);
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    onClose();
    navigate("/");
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex items-center justify-between p-6 border-b">
      <Link to='/'>
                <img src="/logo.jpeg" className="w-24 h-auto" alt="Logo" />
      </Link>

      </div>

      <nav className="flex-1 overflow-y-auto p-6">
        <ul className="space-y-1">
          {menuData.topMenu.map((item) => {
            const isClickable = !item.isPlaceholder;

            return (
              <li key={item.id}>
                {item.hasDropdown ? (
                  <>
                    <button
                      onClick={() => isClickable && setOpenMenu(openMenu === item.id ? null : item.id)}
                      disabled={!isClickable}
                      className={cn(
                        "flex items-center justify-between w-full py-3 text-sm font-medium",
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
                    {openMenu === item.id && isClickable && (
                      <ul className="pl-4 mt-1 space-y-1 border-l-2 border-gray-200">
                        {item.items?.map((subItem) => (
                          <li key={subItem.id}>
                            <Link 
                              to={subItem.href} 
                              onClick={onClose} 
                              className="block py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                            >
                              {subItem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  isClickable ? (
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
                  ) : (
                    <span 
                      className="block py-3 text-sm font-medium text-gray-900"
                    >
                      {item.label}
                    </span>
                  )
                )}
              </li>
            );
          })}
        </ul>

        {!isGuest && isAuthenticated && (
          <div className="mt-8 pt-6 border-t">
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-600 font-bold text-sm hover:text-red-700 transition-colors"
            >
              <LogOut className="size-4" />
              Logout Account
            </button>
          </div>
        )}
      </nav>
    </div>
  );
}