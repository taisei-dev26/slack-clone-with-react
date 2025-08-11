import '../Signup/auth.css';
import CreateWorkspaceModal from '../Home/WorkspaceSelector/CreateWorkspaceModal';
import { useCurrentUserStore } from '../../modules/auth/current-user.state';
import { Navigate, useNavigate } from 'react-router-dom';
import { workspaceRepository } from '../../modules/workspaces/workspace.repository';
import { useEffect, useState } from 'react';
import { Workspace } from '../../modules/workspaces/workspace.entity';

function CreateWorkspace() {
  const { currentUser } = useCurrentUserStore();
  const navigate = useNavigate();
  const [homeWorkspace, setHomeWorkspace] = useState<Workspace>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const fetchWorkspaces = async () => {
    try {
      const workspaces = await workspaceRepository.find();
      setHomeWorkspace(workspaces[0])
    } catch (error) {
      console.error('ワークスペースの取得に失敗しました', error)
    } finally {
      setIsLoading(false)
    }
  }

  const CreateWorkspace = async (name: string) => {
    try {
      const newWorkSpace = await workspaceRepository.create(name);
      navigate(`/${newWorkSpace.id}/${newWorkSpace.channels[0].id}`)
      console.log(newWorkSpace)
    } catch (error) {
      console.error("ワークスペースの作成に失敗しました", error)
    }
  }

  if (isLoading) return <div />;
  if (currentUser == null) return <Navigate to="/signin" />
  if (homeWorkspace != null) return <Navigate to={`${homeWorkspace.id}/${homeWorkspace.channels[0].id}`} />;

  return (
    <div>
      <CreateWorkspaceModal onSubmit={CreateWorkspace} />
    </div>
  );
}

export default CreateWorkspace;
