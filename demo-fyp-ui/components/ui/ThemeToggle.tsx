"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
export default function ThemeToggle(){const[theme,setTheme]=useState("dark");useEffect(()=>{const saved=localStorage.getItem("digitforge-theme")||"dark";document.documentElement.dataset.theme=saved;window.setTimeout(()=>setTheme(saved),0);},[]);function toggle(){const next=theme==="dark"?"light":"dark";setTheme(next);localStorage.setItem("digitforge-theme",next);document.documentElement.dataset.theme=next;}return <button onClick={toggle} className="p-2 rounded-lg text-slate-400 hover:bg-slate-800" aria-label={`Switch to ${theme==="dark"?"light":"dark"} theme`}>{theme==="dark"?<Sun size={17}/>:<Moon size={17}/>}</button>}
