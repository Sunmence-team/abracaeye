import React, { useEffect, useState } from 'react'
import api from '../../helpers/api';
import { useUser } from '../../context/UserContext';
import type { userProps } from '../../lib/sharedInterface';
import PaginationControls from '../../utilities/PaginationControls';
import { formatISODateToCustom } from '../../helpers/formatterUtilities';
import { toast } from 'sonner';

const AllUsers: React.FC = () => {
    const { token } = useUser()
    const [allUsers, setAllUsers] = useState<userProps[]>([])
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [lastPage, setLastPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);

    const apiItemsPerPage = 10

    const fetchAllUsers = async () => {
        setIsLoading(true)
        try {
          const response = await api.get(`/users?per_page=${apiItemsPerPage}`, {
            headers: { 
                "Content-Type": `application/json`,
                Authorization: `Bearer ${token}` 
            },
          });
    
          if (response.status === 200) { 
            const { data, last_page } = response.data.users
            setAllUsers(data)
            setLastPage(last_page)
          }
    
        } catch (err) {
          console.error("Failed to fetch users: ", err);
        } finally {
          setIsLoading(false)
        }
    }

    const handleVerifyUser = async (user: userProps) => {
        if (!user.id) {
            console.error("User ID is undefined, cannot verify.");
            return;
        }
        setIsVerifying(true);
        try {
            const response = await api.put(`/users/verify/${user.id}`, {}, {
                headers: { 
                    "Content-Type": `application/json`,
                    Authorization: `Bearer ${token}` 
                },
            });

            if (response.status === 200) {
                toast.success(`${user.name} verified successfully.`);
                fetchAllUsers();
            }
        } catch (err: any) {
            console.error(`Failed to verify ${user.name}: `, err);
            toast.error(`Failed to verify user: ${err?.response?.data?.message}`);
        } finally {
            setIsVerifying(false);
        }
    }

    useEffect(() => {
        fetchAllUsers()
    }, [token])

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">
            <div className="size-15 border-4 border-dark-red rounded-full border-t-transparent animate-spin"></div>
        </div>
    }

    return (
        <div>
            <div className="overflow-x-auto rounded-lg no-scrollbar w-full lg:p-0 pe-4">
                <table className='w-full min-w-[800px] text-center'>
                <thead>
                    <tr className='bg-dark-red text-white h-[55px]'>
                    <th className='p-4 md:text-sm text-xs whitespace-nowrap'>S/N</th>
                    <th className='p-4 md:text-sm text-xs whitespace-nowrap'>Name</th>
                    <th className='p-4 md:text-sm text-xs whitespace-nowrap'>Email</th>
                    <th className='p-4 md:text-sm text-xs whitespace-nowrap'>Is Blogger</th>
                    <th className='p-4 md:text-sm text-xs whitespace-nowrap'>Is Vendor</th>
                    <th className='p-4 md:text-sm text-xs whitespace-nowrap'>Date Joined</th>
                    <th className='p-4 md:text-sm text-xs whitespace-nowrap'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? (
                        <tr className='bg-white/61 border-y border-black/10'>
                            <td colSpan={7} className="text-center py-4 bg-white">Fetching users...</td>
                        </tr>
                    )  : allUsers.length === 0 && !isLoading ? (
                        <tr>
                            <td colSpan={7} className="text-center bg-white/61 py-4 border-y border-black/10">No user found.</td>
                        </tr>
                    ) : (
                        allUsers.filter(user => user?.role !== "admin").map((user, index) => {
                            const serialNumber = (currentPage - 1) * apiItemsPerPage + (index + 1);
                            return(  
                            <tr
                                key={user.id}
                                className={`${index % 2 === 0 ? "bg-dark-red/10" : "bg-[#F8F8F8]"} h-[50px] border-y border-black/10`}
                                >
                                <td className='p-4 md:text-sm text-xs font-medium'>
                                    {serialNumber || index+1}
                                </td>

                                <td className='p-4 md:text-sm text-xs capitalize font-medium'>
                                    {user?.name || "-"}
                                </td>

                                <td className='p-4 md:text-sm text-xs font-medium'>
                                    {user?.email || "-"}
                                </td>

                                <td className='p-4 md:text-sm text-xs font-medium'>
                                    {user?.blog ? "Yes" : "No"}
                                </td>

                                <td className='p-4 md:text-sm text-xs font-medium'>
                                    {user?.vendor ? "Yes" : "No"}
                                </td>

                                <td className='p-4 md:text-sm text-xs font-medium'>
                                    {formatISODateToCustom(user?.created_at) || "-"}
                                </td>

                                <td className='p-4 md:text-sm text-xs font-medium'>
                                    <button
                                        type='button'
                                        className='bg-dark-red text-white rounded-md text-xs h-[50px] px-2 disabled:opacity-50 cursor-pointer'
                                        disabled={user?.blog || user?.vendor || isVerifying}
                                        onClick={() => handleVerifyUser(user)}
                                    >
                                        {isVerifying ? "Verifing..." : "Verify as blogger/vendor"}
                                    </button>
                                </td>

                            </tr>
                            )
                        })
                    )}
                </tbody>
                <tfoot>
                    <tr className='bg-white'>
                        <td className='p-4' colSpan={7}>
                            {!isLoading && allUsers.length > 0 && (
                                <div className="flex justify-center items-center gap-2 mt-4">
                                    <PaginationControls
                                        currentPage={currentPage}
                                        totalPages={lastPage}
                                        setCurrentPage={setCurrentPage}
                                    />
                                </div>
                            )}
                        </td>
                    </tr>
                </tfoot>
                </table>
            </div>
        </div>
    )
}

export default AllUsers