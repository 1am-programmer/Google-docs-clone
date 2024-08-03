import React, { useState } from "react";

const Collaborator = ({
  creatorId,
  email,
  collaborator,
  user,
}: CollaboratorProps) => {
  const [userType, setUserType] = useState(collaborator.userType || "viewer");
  const [loading, setLoading] = useState(false);

  const ShareDocumentHandler = async (type: string) => {};
  const removeCollaboratorHandler = async (email: string) => {};

  return <div>Collaborator</div>;
};

export default Collaborator;
