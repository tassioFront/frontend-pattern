import Typography from '@/components/Typography/Typography';
import { IContent } from '../../content';
import { createIdByString } from '@/helpers/string/string';

const Challenges = ({
  challenges,
}: {
  challenges: IContent['challenges'];
}): JSX.Element => {
  return (
    <>
      {challenges.map((challenge) => (
        <div key={challenge.title}>
          <Typography
            tag="h3"
            id={createIdByString(challenge.title)}
            label={challenge.title}
          />
          {challenge.desc.map((des) => (
            <p key={des} dangerouslySetInnerHTML={{ __html: des }} />
          ))}
        </div>
      ))}
    </>
  );
};

export default Challenges;
