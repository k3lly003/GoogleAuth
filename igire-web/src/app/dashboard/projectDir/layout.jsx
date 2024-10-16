
import DashboardSideBar from "./(components)/DashboardSideBar";
import DashboardNavBar from "./(components)/DashboardNavBar";

export default function DashboardLayout({ children }) {
    return (
        <>
            <div className="grid min-h-screen w-full desktop:grid-cols-[280px_1fr]">
                <DashboardSideBar />
                <DashboardNavBar>
                    <main className="flex flex-col gap-4 p-4 desktop:gap-6">
                        {children}
                    </main>
                </DashboardNavBar >
            </div>
        </>
    );
}; 

