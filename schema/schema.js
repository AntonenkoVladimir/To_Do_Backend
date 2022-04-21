const graphql = require("graphql");
const Tasks = require("../models/tasks")

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const TaskType = new GraphQLObjectType({
  name: "Tasks",
  fields: () => ({
    id: {type: GraphQLID},
    text: {type: GraphQLString},
    isCheck: {type: GraphQLBoolean}
  })
})

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    allTasks: {
      type: new GraphQLList(TaskType),
      resolve() {
        return Tasks.find();
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {

    addTask: {
      type: TaskType,
      args: {
        text: {type: new GraphQLNonNull(GraphQLString)},
        isCheck: {type: new GraphQLNonNull(GraphQLBoolean)}
      },
      resolve(parent, args) {
        const task = new Tasks({
          text: args.text,
          isCheck: args.isCheck
        });
        return task.save();
      }
    },

    deleteTask: {
      type: TaskType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLID)}
      },
      resolve(parent, args) {
        return Tasks.findByIdAndRemove(args.id);
      }
    },

    updateTask: {
      type: TaskType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLID)},
        text: {type: new GraphQLNonNull(GraphQLString)},
        isCheck: {type: new GraphQLNonNull(GraphQLBoolean)}
      },
      resolve(parent, args) {
        return Tasks.findByIdAndUpdate({_id: args.id}, {
          text: args.text,
          isCheck: args.isCheck
        }, {returnOriginal: false})

      }
    },
  }
})

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});

