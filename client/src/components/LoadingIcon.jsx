export const Loading = ({_loading})=>{
    if(_loading){
        return <div className="flex justify-center items-center max-h-full max-w-full bg-black/65 absolute left-0 top-0 h-screen w-screen z-50">
                   <div className="text-white h-[30px]">Loading...</div> 
                </div>
    }
    return '';
}