document.addEventListener('DOMContentLoaded', () => {
  const profileForm = document.getElementById('profile-form');
  const detailsForm = document.getElementById('details-form');
  const uploadDetailsSection = document.getElementById('upload-details');
  const viewDetailsSection = document.getElementById('view-details');
  const detailsList = document.getElementById('details-list');

  profileForm.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(profileForm);

    displayProfile(formData);
    profileForm.reset();
  });

  detailsForm.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(detailsForm);
    const details = formData.get('additional_details');
    const video = formData.get('video');

    displayDetails(details, video);
    detailsForm.reset();
  });

  const displayProfile = profile => {
    const name = profile.get('name');
    const email = profile.get('email');
    const profile_description = profile.get('profile_description');

    const profileInfo = `
      <strong>Name:</strong> ${name}<br>
      <strong>Email:</strong> ${email}<br>
      <strong>Profile Description:</strong> ${profile_description}<br>
    `;
    uploadDetailsSection.style.display = 'block';
    viewDetailsSection.style.display = 'block';
    detailsList.innerHTML = profileInfo;
  };

  const displayDetails = (details, video) => {
    const detailsItem = document.createElement('div');
    detailsItem.classList.add('details-item');
    if (isYouTubeLink(video)) {
      detailsItem.innerHTML = `
        <p>${details}</p>
        <iframe width="560" height="315" src="${video}" frameborder="0" allowfullscreen></iframe>
      `;
    } else {
      detailsItem.innerHTML = `
        <p>${details}</p>
        <video controls>
          <source src="${URL.createObjectURL(video)}" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      `;
    }
    detailsList.appendChild(detailsItem);
  };

  const isYouTubeLink = link => {
    return link.includes('youtube.com') || link.includes('youtu.be');
  };
});
