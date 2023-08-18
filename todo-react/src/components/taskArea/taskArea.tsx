import React, { FC, ReactElement, useContext, useEffect } from 'react';
import { Alert, Box, Grid, LinearProgress } from '@mui/material';
import { format } from 'date-fns';
import { TaskCounter } from '../taskCounter/taskCounter';
import { Task } from '../task/task';
import { useMutation, useQuery } from '@tanstack/react-query';
import { sendApiRequest } from '../../helpers/sendApiRequest';
import { ITaskApi } from './interfaces/ITaskApi';
import { Status } from '../createTaskForm/enums/Status';
import { IUpdateTask } from './interfaces/IUpdateTask';
import { countTasks } from './helpers/countTask';
import { TaskStatusChangedContext } from '../../context';

export const TaskArea: FC = (): ReactElement => {
  const tasksUpdatedContext = useContext(TaskStatusChangedContext);

  const { error, isLoading, data, refetch } = useQuery(['tasks'], async () => {
    return await sendApiRequest<ITaskApi[]>(
      'http://localhost:3200/tasks',
      'GET',
    );
  });

  const updateTaskMutation = useMutation((data: IUpdateTask) =>
    sendApiRequest('http://localhost:3200/tasks', 'PUT', data),
  );

  useEffect(() => {
    refetch();
  }, [tasksUpdatedContext.updated]);

  useEffect(() => {
    if (updateTaskMutation.isSuccess) {
      tasksUpdatedContext.toggle();
    }
  }, [updateTaskMutation.isSuccess]);

  function onStatusChangeHandler(
    e: React.ChangeEvent<HTMLInputElement>,
    id: string,
  ) {
    updateTaskMutation.mutate({
      id,
      status: e.target.checked ? Status.inProgress : Status.todo,
    });
  }

  function markCompleteHandler(
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
    id: string,
  ) {
    updateTaskMutation.mutate({
      id,
      status: Status.completed,
    });
  }

  return (
    <Grid item md={8} px={4}>
      <Box mb={8} px={4}>
        <h2>Status Of Your Task As On {format(new Date(), 'PPPP')}</h2>
      </Box>
      <Grid container display="flex" justifyContent="center">
        <Grid
          item
          display="flex"
          flexDirection="row"
          justifyContent="space-around"
          alignItems="center"
          md={10}
          xs={12}
          mb={8}
        >
          <TaskCounter
            status={Status.todo}
            count={data ? countTasks(data, Status.todo) : 0}
          />
          <TaskCounter
            status={Status.inProgress}
            count={data ? countTasks(data, Status.inProgress) : 0}
          />
          <TaskCounter
            status={Status.completed}
            count={data ? countTasks(data, Status.completed) : 0}
          />
        </Grid>
        <Grid item display="flex" flexDirection="column" xs={10} md={8}>
          <>
            {error && <Alert severity="error">Error fetching tasks</Alert>}
            {!error && Array.isArray(data) && data.length === 0 && (
              <Alert severity="warning">
                You do not have any tasks created yet. Start by creating a task.
              </Alert>
            )}
            {isLoading ? (
              <LinearProgress />
            ) : (
              Array.isArray(data) &&
              data.length > 0 &&
              data.map((task) => {
                return task.status === Status.todo ||
                  task.status === Status.inProgress ? (
                  <Task
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    description={task.description}
                    date={new Date(task.date)}
                    status={task.status}
                    priority={task.priority}
                    onStatusChange={onStatusChangeHandler}
                    onClick={markCompleteHandler}
                  />
                ) : (
                  false
                );
              })
            )}
          </>
        </Grid>
      </Grid>
    </Grid>
  );
};
