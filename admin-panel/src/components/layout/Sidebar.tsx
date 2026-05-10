import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useRedux';
import { logout } from '../../store/slices/authSlice';

const navItems = [
  { to: '/',          icon: '📊', label: 'Dashboard'  },
  { to: '/content',   icon: '🎬', label: 'Content'    },
  { to: '/users',     icon: '👥', label: 'Users'      },
  { to: '/analytics', icon: '📈', label: 'Analytics'  },
  { to: '/settings',  icon: '⚙️',  label: 'Settings'   },
];

export default function Sidebar() {
  const dispatch = useAppDispatch();

  return (
    <aside className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-gray-700">
        <h1 className="text-xl font-bold text-white font-heading">🎬 EntertainingHub</h1>
        <p className="text-xs text-gray-400 mt-1">Admin Dashboard</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'text-gray-400 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-gray-700">
        <button
          onClick={() => dispatch(logout())}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-gray-400 hover:bg-red-900/40 hover:text-red-400 transition-all duration-150"
        >
          <span className="text-lg">🚪</span>
          Logout
        </button>
      </div>
    </aside>
  );
}
