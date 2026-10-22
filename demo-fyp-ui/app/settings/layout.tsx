import Sidebar from "@/components/layout/Sidebar";
export default function SettingsLayout({children}:{children:React.ReactNode}){return <div className="flex min-h-screen bg-slate-950"><Sidebar/><div className="min-w-0 flex-1">{children}</div></div>}
