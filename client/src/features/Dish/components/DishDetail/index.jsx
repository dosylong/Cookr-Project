import React from 'react';
import './DishDetail.css';
import { useSelector } from 'react-redux';
import {
  IconButton,
  Avatar,
  Stack,
  Typography,
  Tooltip,
  Zoom,
} from '@mui/material';
import {
  AccessTime,
  WatchLaterRounded,
  GroupRounded,
  MoreHoriz,
  LocalDining,
} from '@mui/icons-material';
import { useHistory } from 'react-router-dom';

export default function DishDetail(props) {
  const { dishDetail } = props;
  const history = useHistory();

  const onClickAuthorProfile = () => {
    history.push(`/profile/${dishDetail.authorId}`);
  };

  const uid = useSelector((state) => state.userAuth.id);
  const isOwner = dishDetail.authorId === uid;

  const recipeImg =
    'https://images.immediate.co.uk/production/volatile/sites/30/2012/09/Beef-wellington-d4f3320.jpg';
  return (
    <main className='page'>
      <div className='recipe-page'>
        <section className='recipe-hero'>
          <img src={recipeImg} className='img recipe-hero-img' alt='img' />
          <article className='recipe-info'>
            <h2>{dishDetail.name}</h2>
            <p>{dishDetail.description}</p>
            <Stack direction='row' spacing={1} sx={{ pl: 53 }}>
              <Typography
                onClick={onClickAuthorProfile}
                sx={{ pt: 1, fontWeight: 'bold', cursor: 'pointer' }}>
                {dishDetail.user?.fullName}
              </Typography>

              <Tooltip
                title={dishDetail.user?.fullName}
                TransitionComponent={Zoom}>
                <Avatar
                  sx={{ cursor: 'pointer' }}
                  onClick={onClickAuthorProfile}
                  src={dishDetail.user?.photoURL}
                  alt='avatar'
                />
              </Tooltip>
            </Stack>
            {isOwner && (
              <div>
                <IconButton aria-label='home'>
                  <MoreHoriz />
                </IconButton>
              </div>
            )}

            <div className='recipe-icons'>
              <article>
                <i>
                  <WatchLaterRounded fontSize='large' />
                </i>
                <h5>preparing time</h5>
                {dishDetail.recipes?.map((recipe) => {
                  return <p key={recipe.id}>{recipe.prepTime} mins</p>;
                })}
              </article>
              <article>
                <i>
                  <AccessTime fontSize='large' />
                </i>
                <h5>cooking time</h5>
                {dishDetail.recipes?.map((recipe) => {
                  return <p key={recipe.id}>{recipe.cookTime} mins</p>;
                })}
              </article>
              <article>
                <i>
                  <LocalDining fontSize='large' />
                </i>
                <h5>Difficulty</h5>
                {dishDetail.recipes?.map((recipe) => {
                  return <p key={recipe.id}>{recipe.difficulty}</p>;
                })}
              </article>

              <article>
                <i>
                  <GroupRounded fontSize='large' />
                </i>
                <h5>serving</h5>
                <p>6 servings</p>
              </article>
            </div>
            <p className='recipe-tags'>
              Categories: <a href='tag-template.html'>beef</a>
              <a href='tag-template.html'>breakfast</a>
              <a href='tag-template.html'>pancakes</a>
              <a href='tag-template.html'>food</a>
            </p>
          </article>
        </section>
        <section className='recipe-content'>
          <article>
            <h4>Instructions</h4>
            <div className='single-instruction'>
              <header>
                <p>step 1</p>
                <div></div>
              </header>
              <p>
                I'm baby mustache man braid fingerstache small batch venmo
                succulents shoreditch.
              </p>
            </div>

            <div className='single-instruction'>
              <header>
                <p>step 2</p>
                <div></div>
              </header>
              <p>
                Pabst pitchfork you probably haven't heard of them, asymmetrical
                seitan tousled succulents wolf banh mi man bun bespoke selfies
                freegan ethical hexagon.
              </p>
            </div>

            <div className='single-instruction'>
              <header>
                <p>step 3</p>
                <div></div>
              </header>
              <p>
                Polaroid iPhone bitters chambray. Cornhole swag kombucha
                live-edge.
              </p>
            </div>
          </article>
          <article className='second-column'>
            <div>
              <h4>Ingredients</h4>
              {dishDetail.ingredients?.map((ingredient) => {
                return (
                  <p className='single-ingredient' key={ingredient.id}>
                    {ingredient.name}
                  </p>
                );
              })}
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
