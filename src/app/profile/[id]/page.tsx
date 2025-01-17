export default function ProfilePage({params} : any) {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <h1 className="text-3xl font-bold">Profile Page 
            {params.id}
            </h1>
        </div>
    )
}