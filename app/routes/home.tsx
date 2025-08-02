import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import { resumes } from "../../constants/index";
import { type ReactElement, type JSXElementConstructor, type ReactNode, type ReactPortal, useEffect } from "react";
import ResumeCard from "~/components/ResumeCard";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumate" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

export default function Home() {

    const { isLoading, auth } = usePuterStore();
    const location = useLocation();
    const next = location.search.split('next =')[1];
    const navigate = useNavigate();

    useEffect( ()=>{

        if(!auth.isAuthenticated) navigate('/auth?next=/');

    },[auth.isAuthenticated])

  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    
    <Navbar/>
    
    <section className="main-section">

    <div className="page-heading py-16 ">
      <h1>Track Your Applications & Resume Rating</h1>
      <h2>Review your submissions and check AI-powered feedback</h2>
    </div>

    

    {resumes.length > 0 &&(
      <div className="resumes-section">

       {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
          ))}
    </div>
    )}

</section>

  </main>
}
