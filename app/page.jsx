import Feed from "@components/Feed"

const Page = () => {
 return (
   <>
      <section className="w-full flex-center flex-col ">
         <h1 className="head_text text-center" >
            Discover and share
         </h1>
         <h1 className="head_text pink_gradient text-center"> 
            Prompts that work wonders !
         </h1>
         <p className="desc text-center">
            Promptell is an AI prompting tool for discovering and sharing prompts
         </p>
      </section>  
      {/* feed */}
      <Feed/>
   </>

   )
}

export default Page


