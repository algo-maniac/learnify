import { useParams } from 'react-router-dom';
import ExamHeader from './ExamHeader';
import ExamResources from './ExamResources';
const ExamCorner=()=>{
    const param=useParams();
    return (
        <>
            <ExamHeader/>
        </>
    )
}
export default ExamCorner;