import React, { useState } from "react";
import Modal from "../modal/Modal";

const AccessDeniedScreen: React.FC = () => {
  const [openApplyPortal, setOpenApplyPortal] = useState(false);

  return (
    <>
      <div className="h-full p-6 flex flex-col items-center justify-center text-center">
        <h3 className="text-2xl font-bold">
          Unfortunately, You can't add any post at this time
        </h3>
        <p>
          You have to{" "}
          <span className="text-light-red underline underline-offset-3">
            {" "}
            be a blogger
          </span>
        </p>
      </div>
      {openApplyPortal && (
        <Modal onClose={() => setOpenApplyPortal(false)}>
          <h3>Apply to be a blogger</h3>
        </Modal>
      )}
    </>
  );
};

export default AccessDeniedScreen;
