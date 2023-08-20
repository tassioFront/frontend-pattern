import Typography from '@/components/Typography/Typography';
import { IContent } from '../../content';
import { createIdByString } from '@/helpers/string/string';
import AssociatedChips from '@/components/AssociatedChips/AssociatedChips';
import { memo } from 'react';

const Challenges = memo(function Challenges({
  challenges,
}: {
  challenges: IContent['challenges'];
}) {
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
          {challenge.tags?.length !== undefined && (
            <AssociatedChips options={challenge.tags} />
          )}
        </div>
      ))}
    </>
  );
});

export default Challenges;
