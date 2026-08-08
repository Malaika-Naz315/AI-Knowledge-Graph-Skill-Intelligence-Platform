import { Outlet } from "react-router-dom";

import Sidebar from "../Sidebar";
import Navbar from "../Navbar";


function AppLayout() {


    return (


        <div
            className="
                flex
                h-screen
                bg-slate-100
                overflow-hidden
            "
        >



            {/* Sidebar */}

            <Sidebar />





            {/* Main Content Area */}

            <div
                className="
                    flex
                    flex-1
                    flex-col
                    overflow-hidden
                "
            >





                {/* Top Navbar */}

                <Navbar />







                {/* Page Content */}

                <main
                    className="
                        flex-1
                        overflow-y-auto
                        p-6
                        md:p-8
                        bg-slate-100
                    "
                >


                    <Outlet />


                </main>




            </div>




        </div>


    );

}


export default AppLayout;