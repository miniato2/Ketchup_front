import { Tree, AnimatedTree } from 'react-tree-graph';


function TreePractice() {




    const data = {
        name: '대표 남윤진',
        children: [
            {
                name: '개발팀',
                children: [
                    { name: '팀원1', children:[
                            {name: '이후영'},
                            {name: '고라파덕'}


                    ] },

                    { name: '팀원2' },

                    { name: '팀원3' },
                ],
            },
            {
                name: '인사팀',
                children: [
                    { name: '팀원4' },
                    { name: '팀원5' },
                ],
            },
            {
                name: '기획팀',
                children: [
                    { name: '팀원6' },
                    { name: '팀원7' },
                ],
            },
            {
                name: '회계팀',
                children: [
                    { name: '팀원8' },
                    { name: '팀원9' },
                ],
            },
            {
                name: '법무팀',
                children: [
                    { name: '팀원10' },
                    { name: '팀원11' },
                ],
            },
        ],
    };


    return (


        <div>



            <main id="main">
                <br></br>
                <h2>조직도</h2>


                <AnimatedTree
                    data={data}
                    height={400}
                    width={400} />

            </main>
        </div>




    );

}

export default TreePractice;