import BaseScreen from '@/components/BaseScreen/BaseScreen';
import { todoResolvedRouter } from '@/routes/resolvedRoutes';
import DashCard from './components/DashCard/DashCard';
import Styles from './styles';
import { todoCy } from '@/enums/dataCy';

const actions = [
  {
    dataCy: todoCy.goToTodo,
    title: 'Todo list',
    url: todoResolvedRouter,
    description: 'That to-do list you love ;)',
    alt: 'a Todo list example',
    imageUrl:
      'https://img.icons8.com/external-bearicons-flat-bearicons/64/external-To-Do-List-reminder-and-to-do-bearicons-flat-bearicons.png',
  },
];

const Dashboard = (): JSX.Element => {
  return (
    <BaseScreen
      heading="Dashboard"
      description="Enjoy the features I have created. Hope you learn something new!"
    >
      <Styles.DashCardWrapper>
        {actions.map((action) => (
          <DashCard
            key={action.title}
            description={action.description}
            url={action.url}
            imageUrl={action.imageUrl}
            alt={action.alt}
            title={action.title}
            dataCy={action.dataCy}
          />
        ))}
      </Styles.DashCardWrapper>
    </BaseScreen>
  );
};

export default Dashboard;
