const fs = require('fs');

let content = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

// Replace the mobile menu rendering block to be a fixed full-screen overlay
content = content.replace(/\{mobileMenuOpen && \([\s\S]*?\}\s*<\/nav>/, 
`{mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[100] bg-white flex flex-col animate-in fade-in duration-200">
          <div className="flex justify-between items-center p-4 border-b border-black">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
                <span className="font-black text-lg">
                  {user?.nama_lengkap?.charAt(0).toUpperCase() || "U"}
                </span>
              </div>
              <div>
                <p className="font-bold text-black leading-tight">
                  {user?.nama_lengkap || "Admin"}
                </p>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                  {user?.role || "User"}
                </p>
              </div>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg text-black hover:bg-black/5"
            >
              <X size={28} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  \`flex items-center gap-4 px-4 py-4 rounded-xl text-base font-bold transition-all \${isActive ? "bg-black text-white shadow-md" : "text-black hover:bg-black/5 border border-transparent hover:border-black/10"}\`
                }
              >
                {React.cloneElement(item.icon as React.ReactElement, { size: 20 })} 
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
          
          <div className="p-4 border-t border-black">
            <button
              onClick={handleSignOut}
              className="flex items-center justify-center gap-2 w-full p-4 rounded-xl bg-red-50 text-red-600 font-bold border border-red-200 hover:bg-red-100 transition-colors"
            >
              <LogOut size={20} /> <span>Keluar Aplikasi</span>
            </button>
          </div>
        </div>
      )}
    </nav>`);

fs.writeFileSync('src/components/Navbar.tsx', content);
