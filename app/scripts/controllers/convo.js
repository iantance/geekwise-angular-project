'use strict';



angular.module('myappApp')
  .controller('ConvoCtrl', function ($scope, $q, Projects, Users, Messages, Conversations, $routeParams, $route, AppConfigurations) {
    $scope.project = {conversations:[], team:[]};
    $scope.users = [];
    $scope.emptyConvo = true;
    $scope.editsubject = "";
    $scope.editmessage = "";
    $scope.editconvo = [];
    $scope.messageedit = [];
    $scope.ADMIN_ID = AppConfigurations.ADMIN_ID;
    $scope.loginuser = {_id:"0"};
    $scope.teammember = false;
    var getPromise = Projects.get($routeParams.projectId);
    getPromise
        .then(function(data){
            $scope.project = data[0];
            $scope.emptyConvo = $scope.project.conversations.length === 0;
        }, function(){
            console.log(reason);
        });

    $scope.emptyConvo = $scope.project.conversations.length === 0;

    $scope.noAdmin = function(){
        return function (user){
            return user._id != $scope.ADMIN_ID;
        }
    };

    $scope.$watch('project',function (newVal){
        for (var i = $scope.project.team.length - 1; i >= 0; i--) {
            $scope.teammember = ($scope.teammember || $scope.project.team[i]._id==$scope.loginuser._id);
        };
    });


    $scope.editSubject = function(conversation, i){
        $scope.editconvo[i] = true;
        $scope.editsubject = conversation.subject;
    };

    $scope.cancelEdit = function(conversation, i){
        $scope.editconvo[i] = false;
        conversation.subject = $scope.editsubject;
        conversation.open=false;
    };


    $scope.openEditMessage = function(message,i){
        $scope.messageedit[i] = !$scope.messageedit[i];
        $scope.editmessage = message.message;
    };

    $scope.cancelEditMessage = function(message,i){
        $scope.messageedit[i] = !$scope.messageedit[i];
        message.message = $scope.editmessage;
    };

    $scope.addConversation = function (conversation, projectId){
        console.log(conversation);
        var postPromise = Projects.postConvo(conversation, projectId);
        postPromise
            .then(function(data){
                console.log(data);
                if (conversation.messages.user){
                var convoId = data._id;
                var cPostPromise = Projects.postMessage(conversation.messages, projectId, convoId);
                cPostPromise
                .then(function(){
                    $route.reload();
                },function(){
                    console.log(reason);
                }); 
                } else{
                    $route.reload();
                }

                
            },function(){
                console.log(reason);
            });
    };

    $scope.newConversation = {
        subject:"",
        messages:{
            user:"",
            message:""
        }
    };

    $scope.newMessage = {
        message:"",
        user:""
    };

    $scope.$watch("loginuser",function (newVal){
        $scope.newMessage.user = newVal;
        $scope.newConversation.user = newVal;
    })

    $scope.deleteConvo= function(conversation){
        var delPromise = Conversations.c_delete(conversation);
        delPromise
            .then(function(data){
                $route.reload();
            },function(){
                console.log(reason);
            });
    };

    $scope.addMessage = function (message, projectId, convoId){
        var postPromise = Projects.postMessage(message, projectId, convoId);
        postPromise
            .then(function(data){
                $route.reload();
            },function(){
                console.log(reason);
            });
    };

    $scope.editMessage = function(message){
        var putPromise = Messages.put(message);
        putPromise
            .then(function(){
                $route.reload();
            },function(){
                console.log(reason);
            });
    };

    $scope.editConvo = function(conversation){
        var putPromise = Conversations.put(conversation);
        putPromise
            .then(function(){
                $route.reload();
            },function(){
                console.log(reason);
            });
    };


    
  });

