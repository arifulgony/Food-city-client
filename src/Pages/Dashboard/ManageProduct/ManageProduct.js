import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../Shared/Loading/Loading';
//all product
const ManageProducts = () => {
    const [deletingDoctor, setDeletingDoctor] = useState(null);

    const closeModal = () => {
        setDeletingDoctor(null);
    }


    const { data: Produc, isLoading, } = useQuery({
        queryKey: ['Produc'],
        queryFn: async () => {
            try {
                const res = await fetch(' https://food-city-server.vercel.app/allProducts', {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const data = await res.json();
                return data;
            }
            catch (error) {

            }
        }
    });

    

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
      <div>
        <h2 className="text-3xl">Advertised items: {Produc?.length}</h2>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Photo</th>
                <th>Name</th>
                <th>Resale Price</th>
                <th>Category</th>
                <th>Original Price</th>
              </tr>
            </thead>
            <tbody>
              {Produc.map((doctor, i) => (
                <tr key={doctor._id}>
                  <th>{i + 1}</th>
                  <td>
                    <div className="avatar">
                      <div className="w-24 rounded-full">
                        <img src={doctor.image} alt="" />
                      </div>
                    </div>
                  </td>
                  <td>{doctor.name}</td>
                  <td>{doctor.price}</td>
                  <td>{doctor.category}</td>
                  
                  <td>
                    <label
                      onClick={() => setDeletingDoctor(doctor)}
                      htmlFor="confirmation-modal"
                      className="btn btn-sm btn-error"
                    >
                      Advertised
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {deletingDoctor && (
          <ConfirmationModal
            title={`Are you sure you want to Advertised items added?`}
            message={`If you delete ${deletingDoctor.name}. It cannot be undone.`}
            // successAction={handleDeleteDoctor}
            successButtonName="Delete"
            modalData={deletingDoctor}
            closeModal={closeModal}
          ></ConfirmationModal>
        )}
      </div>
    );
};

export default ManageProducts;